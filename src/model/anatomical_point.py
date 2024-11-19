from dataclasses import dataclass
from src.model.anatomical_point_enum import AnatomicalPointEnum

@dataclass(init=True, repr=True, eq=True,frozen=True)
class AnatomicalPoint:
    nome:AnatomicalPointEnum
    eixo_y:float
    eixo_x:float
    eixo_z:float
    