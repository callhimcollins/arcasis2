import axios from 'axios';
import { supabase } from '@/lib/supabase';

interface ProductCrawledTypes {
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  availabilityStatus: boolean;
}

const addCrawledProductToDatabase = async (products: ProductCrawledTypes[]) => {
  try {
    // Filter out products with missing or invalid names
    const validProducts = products.filter(product => product.name && product.name.trim() !== "");

    if (validProducts.length > 0) {
      console.log(`Adding ${validProducts.length} valid products to database`);
      const { error } = await supabase.from('Products').upsert(validProducts);
      if (error) {
        console.log('Error adding products to database', error.message);
      } else {
        console.log('Products added successfully');
      }
    } else {
      console.log('No valid products found to add to database');
    }
  } catch (error) {
    console.log('An unknown error occurred when trying to add products to database', error);
  }
};

const crawlProduct = async (productName: string) => {
  console.log('Crawling products...');

  const options = {
    method: 'GET',
    url: 'https://walmart-api4.p.rapidapi.com/search',
    params: {
      q: productName,
      page: '1',
    },
    headers: {
      'x-rapidapi-key': '48437486c5msh259c15b3d31c8b1p1eba8ejsn2e01958fa34a',
      'x-rapidapi-host': 'walmart-api4.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);

    // Collect products to insert into the database
    const productsToInsert: ProductCrawledTypes[] = [];

    // Flattening nested results and preparing data
    response.data.searchResult.forEach((outerArray: any) => {
      outerArray.forEach((product: any) => {
        // Only push the product if it has a valid name
        if (product.name && product.name.trim() !== "" && product.price !== 0 && !product.isOutOfStock) {
          const crawledProduct: ProductCrawledTypes = {
            name: product.name,
            price: product.price,
            description: product.shortDescription,
            imageUrl: product.image,
            availabilityStatus: !product.isOutOfStock,
          };
          productsToInsert.push(crawledProduct);
        } else {
          console.log(`Skipping product with missing or invalid name: ${product}`);
        }
      });
    });

    // Insert all the crawled products at once
    if (productsToInsert.length > 0) {
      await addCrawledProductToDatabase(productsToInsert);
    } else {
      console.log('No valid products found for crawling');
    }
  } catch (error) {
    console.error('Error during API request or processing', error);
  }
};

export default crawlProduct;
