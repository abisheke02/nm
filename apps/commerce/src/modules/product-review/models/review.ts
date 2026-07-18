import { model } from '@medusajs/framework/utils';

const ProductReview = model.define('product_review', {
  id: model.id().primaryKey(),
  product_id: model.text(),
  customer_id: model.text().nullable(),
  author_name: model.text(),
  rating: model.number(),
  title: model.text().nullable(),
  body: model.text(),
  is_approved: model.boolean().default(false),
});

export default ProductReview;
