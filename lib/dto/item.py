from typing import Union
from pydantic import BaseModel

class Item(BaseModel):
    name: str
    dataQrCode: Union[str, None] = None