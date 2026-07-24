import type { MedusaRequest, MedusaStoreRequest, MedusaResponse } from '@medusajs/framework/http';
import { PRODUCT_REVIEW_MODULE } from '../../../modules/product-review';
import ProductReviewModuleService from '../../../modules/product-review/service';

type CreateReviewBody = {
  product_id: string;
  author_name: string;
  rating: number;
  title?: string;
  body: string;
};

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const productReviewService: ProductReviewModuleService = req.scope.resolve(PRODUCT_REVIEW_MODULE);
  const productId = req.query.product_id as string | undefined;

  const reviews = await productReviewService.listProductReviews(
    productId ? { product_id: productId, is_approved: true } : { is_approved: true }
  );

  res.json({ reviews });
}

export async function POST(req: MedusaStoreRequest<CreateReviewBody>, res: MedusaResponse) {
  const productReviewService: ProductReviewModuleService = req.scope.resolve(PRODUCT_REVIEW_MODULE);
  const body = req.validatedBody ?? req.body;

  const review = await productReviewService.createProductReviews({
    product_id: body.product_id,
    customer_id: req.auth_context?.actor_id ?? null,
    author_name: body.author_name,
    rating: body.rating,
    title: body.title ?? null,
    body: body.body,
    is_approved: false,
  });

  res.json({ review });
}
