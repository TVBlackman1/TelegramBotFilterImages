import sys
sys.path.insert(0,'..')

from controllers.ImageProcess import blur, brightness_down, brightness_up

filters = {
    1: blur,
    2: brightness_down,
    3: brightness_up,
}

def pick_filter(name=1):
    return filters.get(name, 1)