
resource "aws_s3_bucket" "private" {
  bucket = "private-${local.service_name}-bucket"
  versioning {
    enabled = true
  }
  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }
}