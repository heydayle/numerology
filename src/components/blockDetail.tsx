import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";

type BlockDetailProps = {
    type: string;
    style?: string;
    title?: string;
    description: string;
    isLoading?: boolean;
    className?: string
}

export function BlockDetail({ type, style, title, description, isLoading, className }: BlockDetailProps) {
    const classNameBind = cn('px-4 py-6 bg-neutral-900/20 border border-neutral-900 filter backdrop-blur-sm rounded-lg shadow-md', [className])
    return (
        <div key={type} className={classNameBind}>
            {title && <h3 className={`text-xl font-semibold mb-4 ${style}`}>{ title }</h3>}
            <div className="text-neutral-300">
                {isLoading 
                ? (
                    <div className="flex flex-col gap-3">
                        <Skeleton className="h-[10px] w-full rounded-full" />
                        <Skeleton className="h-[10px] w-full rounded-full" />
                        <Skeleton className="h-[10px] w-full rounded-full" />
                        <Skeleton className="h-[10px] w-1/2 rounded-full" />
                        <Skeleton className="h-[10px] w-1/3 rounded-full" />
                    </div>
                )
                :  <p className="whitespace-pre-line">{description}</p>
                }
            </div>
        </div>
    );
}