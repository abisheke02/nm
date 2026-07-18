import { MedusaService } from '@medusajs/framework/utils';
import ProductReview from './models/review';

class ProductReviewModuleService extends MedusaService({
  ProductReview,
}) {}

export default ProductReviewModuleService;
