import struct
import zlib
import os

def make_png(path, w, h, r, g, b):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    png = b'\x89PNG\r\n\x1a\n'
    ihdr = struct.pack('>IIBBBBB', w, h, 8, 2, 0, 0, 0)
    png += struct.pack('>I', len(ihdr)) + b'IHDR' + ihdr + struct.pack('>I', zlib.crc32(b'IHDR' + ihdr))
    raw = (b'\x00' + bytes([r, g, b]) * w) * h
    comp = zlib.compress(raw)
    png += struct.pack('>I', len(comp)) + b'IDAT' + comp + struct.pack('>I', zlib.crc32(b'IDAT' + comp))
    png += struct.pack('>I', 0) + b'IEND' + struct.pack('>I', zlib.crc32(b'IEND'))
    with open(path, 'wb') as f:
        f.write(png)
    print(f"Created {path} ({w}x{h})")

if __name__ == '__main__':
    base_dir = os.path.dirname(os.path.abspath(__file__))
    assets_dir = os.path.join(base_dir, 'apps', 'mobile', 'assets')
    make_png(os.path.join(assets_dir, 'icon.png'), 512, 512, 0x12, 0x3C, 0x3A)
    make_png(os.path.join(assets_dir, 'splash-icon.png'), 512, 512, 0x12, 0x3C, 0x3A)
    make_png(os.path.join(assets_dir, 'adaptive-icon.png'), 512, 512, 0x12, 0x3C, 0x3A)
    print("All assets generated successfully!")
