import os
from PIL import Image

def optimize_image(img_path, target_width=1600, min_kb=100, max_kb=250):
    # Open inside context manager and copy to release the file handle immediately
    with Image.open(img_path) as original:
        img = original.copy()
        
    w, h = img.size
    
    # Resize if width exceeds target
    if w > target_width:
        h = int(h * (target_width / w))
        w = target_width
        img = img.resize((w, h), Image.Resampling.LANCZOS)
        
    # Search for optimal compression quality to target 100-250 KB
    temp_path = img_path + ".temp"
    best_quality = 85
    
    # Check size at quality 85
    img.save(temp_path, "WEBP", quality=85)
    initial_size = os.path.getsize(temp_path) / 1024
    
    if initial_size > max_kb:
        # Loop down to find a quality that fits the target
        for q in range(85, 49, -3):
            img.save(temp_path, "WEBP", quality=q)
            size_kb = os.path.getsize(temp_path) / 1024
            best_quality = q
            if size_kb <= max_kb:
                break
    else:
        best_quality = 85

    # Save final optimized image in place
    img.save(img_path, "WEBP", quality=best_quality)
    if os.path.exists(temp_path):
        try:
            os.remove(temp_path)
        except Exception as e:
            print(f"Warning: could not remove temporary file {temp_path}: {e}")
        
    final_size = os.path.getsize(img_path) / 1024
    print(f"Optimized {os.path.basename(img_path)}: {w}x{h}, quality={best_quality}, size={final_size:.1f} KB")

def generate_variant(img_path, suffix, target_width):
    with Image.open(img_path) as original:
        img = original.copy()
        
    w, h = img.size
    
    # Downscale for responsive variants
    if w > target_width:
        h = int(h * (target_width / w))
        w = target_width
        img = img.resize((w, h), Image.Resampling.LANCZOS)
    
    out_path = img_path.replace('.webp', f"{suffix}.webp")
    img.save(out_path, "WEBP", quality=75)
    
    final_size = os.path.getsize(out_path) / 1024
    print(f"  Generated {suffix} variant ({w}x{h}): {final_size:.1f} KB")

def main():
    # Process images folder
    image_dir = 'images'
    files = sorted(os.listdir(image_dir))
    
    for f in files:
        if not f.endswith('.webp'):
            continue
        
        path = os.path.join(image_dir, f)
        
        # Skip documents and dynamic variants
        if any(doc in f for doc in ['gst_preview', 'msme_preview', 'trademark_preview']):
            # Just optimize document in place
            optimize_image(path, target_width=800, min_kb=40, max_kb=100)
            continue
            
        if '-800' in f or '-160' in f:
            continue
            
        # Optimize main product image
        optimize_image(path, target_width=1600, min_kb=100, max_kb=250)
        
        # Generate responsive variants
        generate_variant(path, '-800', 800)
        generate_variant(path, '-160', 160)

    # Process 26.webp in root
    if os.path.exists('26.webp'):
        optimize_image('26.webp', target_width=1600, min_kb=100, max_kb=250)
        generate_variant('26.webp', '-800', 800)
        generate_variant('26.webp', '-160', 160)

    # Convert twoday.jpg to webp and optimize it
    if os.path.exists('twoday.jpg'):
        print("Converting twoday.jpg to WebP...")
        with Image.open('twoday.jpg') as original:
            img = original.copy()
        img.save('twoday.webp', 'WEBP', quality=80)
        optimize_image('twoday.webp', target_width=1600, min_kb=100, max_kb=250)
        generate_variant('twoday.webp', '-800', 800)
        # Delete large original to save deployment size
        try:
            os.remove('twoday.jpg')
            print("Removed original twoday.jpg")
        except Exception as e:
            print(f"Could not remove twoday.jpg: {e}")

if __name__ == '__main__':
    main()
