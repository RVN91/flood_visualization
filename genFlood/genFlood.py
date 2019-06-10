# -*- coding: utf-8 -*-
"""
Created on Fri Jun  7 06:24:55 2019

@author: rasmus
"""

import gaussian_filter
import numpy as np
import pandas as pd
import glob

files = glob.glob("*csv")

# Flood extent maps
i = 0
for sigma in np.arange(0.01, 80):
    shape = (20, 20)
#    sigma = 3
    g = gaussian_filter.gaussian_kernel(shape, sigma)
    
    x = list(np.arange(0, shape[0]) / 100 + 9.923038)
    y = list(np.arange(0, shape[1]) / 100 + 57.032173)
    
    xx, yy = np.meshgrid(x, y)
    
    
    lon = xx.flatten()
    lat = yy.flatten()
    g = g.flatten()
    
    data = {'lat': lat,
            'lon': lon,
            'value': g}
    
    df = pd.DataFrame(data = data)
    df.to_csv('flood_' + str(i) + '.csv', index = False)
    i += 1