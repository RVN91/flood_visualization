# -*- coding: utf-8 -*-
"""
Created on Thu May  9 20:34:23 2019

Gaussian filter to remove noise. The derivatives are effected, so it needs to
be removed.

Works by multiplying each pixel and its sorrounding pixels by the a kernel 
value in the kernel matrix and then sum everything up and divide by the total
to normalize (making sure the image doesn't get brigther or darker) like a 
weighted average. Kernels are always odd sizes to have a center value.
         
See https://www.youtube.com/watch?v=C_zFhWdM4ic for an excellent explanation!
    
@author: rasmus
"""

import numpy as np

def gaussian_kernel(shape, sigma):
    """
    Creates 2D gaussian kernel with ndims = shape
    input:
        - shape: Shape of the output kernel
        - sigma: Standard deviation of the kernel shape
    returns:
        - h: Gaussian kernel
    """
    m,n = [(ss-1.)/2. for ss in shape]
    y,x = np.ogrid[-m:m+1,-n:n+1]
    h = np.exp( -(x*x + y*y) / (2.*sigma*sigma) )
    h[ h < np.finfo(h.dtype).eps*h.max() ] = 0
    sumh = h.sum()
    if sumh != 0:
        h /= sumh
    return h

def image_kernel_convolution(image, kernel):
    """
    Convolutes image with kernel
    
    input:
        - image: Input image
        - kernel: Kernel for the convolution
    returns:
        - image: Convoluted image
    """
    image_rows, image_columns = image.shape

    # Calculate offset from the kernel dimensions
    offset = len(kernel) // 2 # two "divide" signs rounds the number to the 
                              # closets integer (lazy implementation)
    
    # Compute convolution between intensity and kernels
    for x in range(offset, image_rows - offset):
        for y in range(offset, image_columns - offset):
            acc = 0
            for a in range(len(kernel)):
                for b in range(len(kernel)):
                    xn = x + a - offset
                    yn = y + b - offset
                    pixel = image[xn, yn]
                    acc += pixel * kernel[a][b]
            image[x, y] = acc
    
    # Set boundaries to zero
    # Upper rows
    image[0 : offset, :] = 174
    # Lower rows
    image[image_rows - offset : image_rows, :] = 174
    # Leftest columns
    image[:, 0 : offset] = 174
    # Rightest columns
    image[:, image_columns - offset : image_columns] = 174
    return image

def gaussian_filter(image, shape, sigma):
    """
    Applies gaussian filter to an image
    
    input:
        - image: 
        - shape:
        - sigma:
    output:
        - gaussian_filtered_image:
    """
    # Create gaussian mask
    kernel = gaussian_kernel(shape, sigma)
    
    # Convolute matrix
    gaussian_filtered_image = image_kernel_convolution(image, kernel)
    
    return gaussian_filtered_image