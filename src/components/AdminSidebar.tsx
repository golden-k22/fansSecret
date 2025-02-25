import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Home,
  User,
  Bell,
  Coins,
  MessageCircle,
  Lock,
  Settings,
  DollarSign

} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ModeToggle } from "./ModeToggle";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import LogoutButton from "./LogoutButton";
import { getUserProfileAction } from "@/app/update-profile/actions";

const SIDEBAR_LINKS = [
  {
    icon: Home,
    label: "Home1",
    href: "/",
  }
  ,  {
  	icon: User,
  	label: "Profile",
  	href: "/update-profile",
  },
  
  {
    icon: Coins,
    label: "Premium1",
    href: "/merch",
  },
  {
    icon: Bell,
    label: "Notifications1",
    href: "/notifications",
  },
  {
    icon: MessageCircle,
    label: "Messages1",
    href: "/messages",
  },
  {
    icon: MessageCircle,
    label: "User Management",
    href: "/mana_admin/user",
  },
];

const AdminSidebar = async ({ id }: { id: string }) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const userProfile = await getUserProfileAction();

  const isAdmin = process.env.ADMIN_EMAIL === user?.email;

  return (
    <div
      className="flex lg:w-1/5 flex-col gap-3 px-2 border-r sticky
    left-0 top-0 h-screen"
    >
      <Link href="/update-profile" className="max-w-fit">
        <Avatar className="mt-4 cursor-pointer">
          <AvatarImage
            src={userProfile?.image || "/user-placeholder.png"}
            className="object-cover"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </Link>

      <nav className="flex flex-col gap-3">
        {SIDEBAR_LINKS.map((link) => {
          if (link.label == "Messages") {
            return (
              <Link
                key={link.href}
                // href={link.href}
                href={{
                  pathname: link.href,
                  query: {
                    id: id,
                    isCreater: userProfile?.isCreater,
                  },
                }}
                className="flex w-12 lg:w-full items-center gap-2 hover:bg-primary-foreground font-bold hover:text-primary px-2 py-1 rounded-full justify-center lg:justify-normal"
              >
                <link.icon className="w-6 h-6" />
                <span className="hidden lg:block">{link.label}</span>
              </Link>
            );
          }
          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex w-12 lg:w-full items-center gap-2 hover:bg-primary-foreground font-bold hover:text-primary px-2 py-1 rounded-full justify-center lg:justify-normal"
            >
              <link.icon className="w-6 h-6" />
              <span className="hidden lg:block">{link.label}</span>
            </Link>
          );
        })}

        <Link
          href={"/secret-dashboard"}
          className="flex w-12 lg:w-full items-center gap-2 hover:bg-primary-foreground font-bold hover:text-primary px-2 py-1 rounded-full justify-center lg:justify-normal"
        >
          <Lock className="w-6 h-6" />
          <span className="hidden lg:block">Vault</span>
        </Link>

        <DropdownMenu>
          <div className="flex w-12 lg:w-full items-center gap-2 hover:bg-primary-foreground font-bold hover:text-primary px-2 py-1 rounded-full justify-center lg:justify-normal">
            <DropdownMenuTrigger className="flex items-center gap-2">
              <Settings className="w-6 h-6" />
              <span className="hidden lg:block">Setting</span>
            </DropdownMenuTrigger>
          </div>

          <DropdownMenuContent>
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/*  this will be navigated to the analytics  */}
            {/* <Link href={process.env.STRIPE_BILLING_PORTAL_LINK_DEV + "?prefilled_email=" + user?.email}>   */}
            <Link
              href={
                process.env.STRIPE_BILLING_PORTAL_LINK_DEV +
                "?prefilled_email=" +
                user?.email
              }
            >
              <DropdownMenuItem>My account</DropdownMenuItem>
            </Link>
            {/* <DropdownMenuSeparator />
						<Link href={process.env.STRIPE_BILLING_PORTAL_LINK_DEV + "?prefilled_email=" + user?.email}>
							<DropdownMenuItem>Billing</DropdownMenuItem>
						</Link> */}
            <LogoutButton />
          </DropdownMenuContent>
        </DropdownMenu>

        <ModeToggle />
      </nav>
    </div>
  );
};
export default AdminSidebar;

// sprint ++
