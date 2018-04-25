from django.http import JsonResponse
import psutil
import platform
import socket
import time
import datetime
# Create your views here.

def get_sys_info(request):
    release = platform.release()
    architecture = platform.architecture()
    system = platform.system()
    hostname = platform.uname().node
    data = {
        'system':system,
        'release':release,
        'architecture':architecture[0]+"--"+architecture[1],
        'hostname':hostname,
    }
    response = JsonResponse(data)
#    response['Access-Control-Allow-Origin'] = '*'
    return response



def get_cpu_percent(request):
    cpu_percent = psutil.cpu_percent();
    data = {
        'success':True,
        'cpu_percent':cpu_percent,
    }
    response = JsonResponse(data)
#    response['Access-Control-Allow-Origin'] = '*'
    return response

def get_cpu_count(request):
    data = {
        'success':True,
        'cpu_count_pysical':psutil.cpu_count(logical=False),
        'cpu_count_logical':psutil.cpu_count(logical=True),
    }
    response = JsonResponse(data)
#    response['Access-Control-Allow-Origin'] = '*'
    return response

def get_cpu_times(request):
    cpu_times = psutil.cpu_times();
    data = {
        'success':True,
        'user':cpu_times.user,
        'system':cpu_times.system,
        'idle':cpu_times.idle,
    }
    response = JsonResponse(data)
#    response['Access-Control-Allow-Origin'] = '*'
    return response

def get_mem_usage(request):
    data = {}
    mem_virtual = psutil.virtual_memory();
    data['virtual'] = {
        'total':mem_virtual.total,
        'available':mem_virtual.available,
        'percent':mem_virtual.percent,
        'used':mem_virtual.used,
        'free':mem_virtual.free,
        'buffers':mem_virtual.buffers,
        'cached':mem_virtual.cached,
    }
    mem_swap = psutil.swap_memory();
    data['swap'] = {
        'total':mem_swap.total,
        'percent':mem_swap.percent,
        'used':mem_swap.used,
        'free':mem_swap.free,
    }
    response = JsonResponse(data)
#    response['Access-Control-Allow-Origin'] = '*'
    return response

def get_disk_usage(request):
    disk_usage = psutil.disk_usage('/');
    data = {
        'success':True,
        'total':disk_usage.total,
        'percent':disk_usage.percent,
        'used':disk_usage.used,
        'free':disk_usage.free,
    }
    response = JsonResponse(data)
    response['Access-Control-Allow-Origin'] = '*'
    return response

def get_disk_count(request):
    disk_count = psutil.disk_io_counters();
    data = {
        'read_bytes':disk_count.read_bytes,
        'write_bytes':disk_count.write_bytes,
    }
    response = JsonResponse(data)
#    response['Access-Control-Allow-Origin'] = '*'
    return response

def get_net_speed(request):
    net_count_1 = psutil.net_io_counters();
    time.sleep(0.1)
    net_count_2 = psutil.net_io_counters();
    send_speed = (net_count_2.bytes_sent-net_count_1.bytes_sent)/100
    receive_speed = (net_count_2.bytes_recv-net_count_1.bytes_recv)/100
    data = {
        'sent_bytes':net_count_2.bytes_sent,
        'receive_bytes':net_count_2.bytes_recv,
        'send_speed':send_speed,
        'receive_speed':receive_speed,
    }
    response = JsonResponse(data)
#    response['Access-Control-Allow-Origin'] = '*'
    return response

def get_net_info(request):
    af_map = {
        socket.AF_INET: 'IPv4',
        socket.AF_INET6: 'IPv6',
        psutil.AF_LINK: 'MAC',
    }

    duplex_map = {
        psutil.NIC_DUPLEX_FULL: "full",
        psutil.NIC_DUPLEX_HALF: "half",
        psutil.NIC_DUPLEX_UNKNOWN: "unknown",
    }

    data = {}
    net_stats = psutil.net_if_stats()
    net_addrs = psutil.net_if_addrs()
    for name,addrs in net_addrs.items():
        sub_data = {}
        st = net_stats[name]
        sub_data['stats'] = {
            'speed':st.speed,
            'duplex':duplex_map.get(st.duplex),
            'mtu':st.mtu,
            'up':'yes' if st.isup else 'no',
        }
        for addr in addrs:
            addr_data = {}
            addr_data['address'] = addr.address
            if addr.broadcast:
                addr_data['broadcast'] = addr.broadcast
            if addr.netmask:
                addr_data['netmask'] = addr.netmask
            if addr.ptp:
                addr_data['ptp'] = addr.ptp
            sub_data[af_map.get(addr.family)] = addr_data
        data[name] = sub_data
    response = JsonResponse(data)
#    response['Access-Control-Allow-Origin'] = '*'
    return response


def process2json(process):
    return {
        'pid':process.pid,
        'name':process.name(),
        'ppid':process.ppid(),
        'cmdline':''.join(str(a) for a in process.cmdline()),
        'create_time':datetime.datetime.fromtimestamp(process.create_time()).strftime("%Y-%m-%d %H:%M:%S"),
        'status':process.status(),
        'cwd':process.cwd(),
        'username':process.username(),
        'priority':process.nice(),
        'cpu_percent':process.cpu_percent(),
        'memory_percent':process.memory_percent(),
    }

def get_process_list(request):
    data = {}
    pids = psutil.pids()
    for pid in pids:
        try:
            process = psutil.Process(pid = pid)
        except (psutil.ZombieProcess, psutil.AccessDenied, psutil.NoSuchProcess):
            pass
        else:
            data[pid] = process2json(process)
    response = JsonResponse(data)
#    response['Access-Control-Allow-Origin'] = '*'
    return response
