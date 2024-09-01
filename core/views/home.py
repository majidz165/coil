from django.shortcuts import render

def HomeView(request):
    if request.user.is_contractor:
        return render(request, 'core/contractor-home.html')