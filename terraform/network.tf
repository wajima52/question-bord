resource "aws_vpc" "service" {
  cidr_block = "10.0.0.0/16"
  enable_dns_support = true
  enable_dns_hostnames = true

  tags = {
    Name = "service"
  }
}

resource "aws_subnet" "public" {
  cidr_block = "10.0.0.0/24"
  vpc_id = aws_vpc.service.id
map_public_ip_on_launch = true
availability_zone = "ap-northeast-1a"
}

resource "aws_internet_gateway" "service_gateway" {
  vpc_id = aws_vpc.service.id
}

