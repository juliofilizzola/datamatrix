from PIL import Image
from pylibdmtx.pylibdmtx import encode

def create_qr_code(data: str) -> Image:
    encoded = encode('hello world'.encode('utf8'))
    img = Image.frombytes('RGB', (encoded.width, encoded.height), encoded.pixels)
    img.save('dmtx.png')
    return img
