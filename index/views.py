from django.shortcuts import get_object_or_404, render, redirect

from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
from django.http import HttpResponse,HttpResponseRedirect
from django.urls import reverse

# Create your views here.




@login_required(login_url='/login')
def index(request):
    return render(request,'index/index.html',{})

def log_out(request):
    logout(request)
    return redirect('/')
