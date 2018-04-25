from django.urls import path
from django.contrib.auth import views as auth_views
from . import views
app_name = 'index'
urlpatterns = [
    path('',views.index, name='index'),
    path('login/',auth_views.login, {
        'template_name':'index/login.html',
    },name='index'),
    path('logout/',views.log_out,name='logout'),
]
