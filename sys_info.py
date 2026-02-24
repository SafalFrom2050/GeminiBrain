import os
import socket
import platform
import datetime
import time
import json

def get_sys_info():
    info = {
        "Computer Name": socket.gethostname(),
        "User": os.getlogin() if hasattr(os, 'getlogin') else "Unknown",
        "OS": platform.system(),
        "OS Release": platform.release(),
        "OS Version": platform.version(),
        "Architecture": platform.machine(),
        "Processor": platform.processor(),
        "Current Date": datetime.datetime.now().strftime("%Y-%m-%d"),
        "Current Time": datetime.datetime.now().strftime("%H:%M:%S"),
        "Timezone": time.strftime("%Z", time.localtime()),
        "Timezone Offset": time.strftime("%z", time.localtime()),
    }
    
    # Try to get more detailed location/timezone info if possible
    try:
        import tzlocal
        info["Local Timezone"] = str(tzlocal.get_localzone())
    except ImportError:
        pass

    return info

if __name__ == "__main__":
    sys_info = get_sys_info()
    print("\n--- System Information (Non-Privileged) ---")
    for key, value in sys_info.items():
        print(f"{key:20}: {value}")
