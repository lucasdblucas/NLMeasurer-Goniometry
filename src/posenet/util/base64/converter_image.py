from PIL import Image
import base64
class ConverterImage():
    
    @classmethod
    def read_image(cls,path: str):
        image_data = None
        with open(path, "rb") as image_file:
            image_data = image_file.read()
        return image_data
    
    @classmethod
    def get_format(cls,path: str):
       img = Image.open(path)
  
       return img.format
    
    @classmethod
    def encode_image_to_base64(cls,binary_image: bytes) -> str:
        return base64.b64encode(binary_image).decode()