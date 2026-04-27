import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

const ButtonWithIconDemo = () => {
  return (
    <Button
      asChild
      className="relative h-12 w-fit cursor-pointer overflow-hidden rounded-full p-1 ps-6 pe-14 font-medium text-sm text-foreground/60 dark:text-white transition-all duration-500 hover:ps-14 hover:pe-6 group border border-border bg-background hover:border-foreground/20 dark:border-border dark:hover:border-foreground/30 hover:bg-accent"
    >
      <a href="mailto:xavierzaidane@gmail.com">
        <span className="relative z-10 transition-all duration-500">
          Let's collaborate
        </span>
        <div className="absolute right-1 flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45">
          <ArrowUpRight size={20} />
        </div>
      </a>
    </Button>
  );
};

export default ButtonWithIconDemo;
