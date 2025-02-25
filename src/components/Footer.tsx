import Link from "next/link";
const Footer = () => {
  return (
    <footer className="md:px-8 md:py-0 border-t">
      <div className="container flex  items-center gap-4 h-24">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          © Copyright FansSecret
        </p>{" "}
        <Link href="/faq">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left underline">
            FAQ
          </p>
        </Link>
        <Link href="/tos">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left underline">
            Terms of Service
          </p>
        </Link>
        <Link href="/privacypolicy">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left underline">
            Privacy Policy
          </p>
        </Link>
        <Link href="/guideline">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left underline">
            Community Guidelines
          </p>
        </Link>
        <Link href="/otherpolicy">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left underline">
            Other Policies
          </p>
        </Link>
        <Link href={"/"}>
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left underline">
            About Us
          </p>
        </Link>
        <Link href={"/"}>
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left underline">
            Contact Us
          </p>
        </Link>
      </div>
    </footer>
  );
};
export default Footer;
