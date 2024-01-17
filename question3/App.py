import itertools

class Dimension:
    def __init__(self, length, width, height):
        self.length = length
        self.width = width
        self.height = height


    def getDimensions(self):
        items = itertools.permutations([self.length, self.width, self.height], 3)
        return list(map(lambda item: Dimension(item[0], item[1], item[2]), set(items)))
    

    def calculateMaxQuantity(self, child: 'Dimension'):
        l = self.length // child.length
        w = self.width // child.width
        h = self.height // child.height
        return l * w * h


def solution(box: Dimension, product: Dimension):
    quantities = [ box.calculateMaxQuantity(item) for item in product.getDimensions()]
    return max(quantities)


def main():
    cartonBox = Dimension(320, 260, 200)
    toblerone = Dimension(210, 35, 35)

    output = solution(cartonBox, toblerone)
    print("The maximum quantity of the product that can be shipped in a carton box:", output)


if __name__ == "__main__":
    main()