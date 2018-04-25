from django.urls import path
from . import views
app_name = 'main'
urlpatterns = [
    path('sys',views.get_sys_info,name='sys'),
    path('cpu_percent',views.get_cpu_percent, name='cpu_percent'),
    path('cpu_count',views.get_cpu_count, name='cpu_count'),
    path('cpu_times',views.get_cpu_times, name='cpu_times'),
    path('mem_usage',views.get_mem_usage, name='cpu_usage'),
    path('disk_usage',views.get_disk_usage, name='disk_usage'),
    path('disk_count',views.get_disk_count, name='disk_count'),
    path('net_speed',views.get_net_speed,name='net_speed'),
    path('net_info',views.get_net_info,name='net_info'),
    path('process',views.get_process_list,name='process'),
]
