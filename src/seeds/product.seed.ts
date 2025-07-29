import { faker } from '@faker-js/faker';
import { ProductEntity } from '../entity/product.entity';
import { AppDataSource } from '../data-source';

async function seedProducts() {
  const dataSource = await AppDataSource.initialize();
  const productRepository = dataSource.getRepository(ProductEntity);

  const products: ProductEntity[] = [];

  for (let i = 0; i < 200; i++) {
    const product = productRepository.create({
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price({ min: 10, max: 500 })),
      quantity: faker.number.int({ min: 1, max: 100 }),
      isAvailable: faker.datatype.boolean(),
      imageUrl: faker.image.urlLoremFlickr({ category: 'product' }),
    });

    products.push(product);
  }

  await productRepository.save(products);
  console.log(`Seeded ${products.length} products`);

  await dataSource.destroy();
}

seedProducts().catch((error) => {
  console.error('Error seeding products:', error);
});
