from fastapi import APIRouter, HTTPException
import docker

router = APIRouter()
client = docker.from_env()

@router.get("/containers")
def list_containers():
    containers = client.containers.list(all=True)
    data = []

    for container in containers:
        image_name = container.attrs["Config"].get("Image", "<none>")

        data.append({
            "id": container.id,
            "name": container.name,
            "image": image_name,
            "status": container.status
        })

    return {"containers": data}


@router.get("/stats/{container_id}")
def get_container_stats(container_id: str):
    try:
        container = client.containers.get(container_id)
    except docker.errors.NotFound:
        return {
            "cpu_percent": 0.0,
            "memory_percent": 0.0,
            "memory_usage": 0,
            "memory_limit": 0,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    try:
        stats = container.stats(stream=False)
    except Exception:
        return {
            "cpu_percent": 0.0,
            "memory_percent": 0.0,
            "memory_usage": 0,
            "memory_limit": 0,
        }


    cpu_percent = 0.0
    try:
        cpu_total = stats["cpu_stats"]["cpu_usage"]["total_usage"]
        cpu_prev = stats["precpu_stats"]["cpu_usage"]["total_usage"]

        sys_total = stats["cpu_stats"].get("system_cpu_usage", 0)
        sys_prev = stats["precpu_stats"].get("system_cpu_usage", 0)

        cpu_delta = cpu_total - cpu_prev
        sys_delta = sys_total - sys_prev

        if sys_delta > 0:
            cpu_percent = (cpu_delta / sys_delta) * 100
    except:
        cpu_percent = 0.0


    try:
        mem_usage = stats["memory_stats"].get("usage", 0)
        mem_limit = stats["memory_stats"].get("limit", 1)
        mem_percent = (mem_usage / mem_limit) * 100 if mem_limit else 0
    except:
        mem_usage = 0
        mem_limit = 0
        mem_percent = 0.0

    return {
        "container_id": container_id,
        "cpu_percent": cpu_percent,
        "memory_usage": mem_usage,
        "memory_limit": mem_limit,
        "memory_percent": mem_percent
    }
