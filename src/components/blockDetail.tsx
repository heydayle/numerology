import { Skeleton } from "./ui/skeleton";
import TextType from "./bits/TextType";

type BlockDetailProps = {
    type: string;
    style?: string;
    title?: string;
    description: string;
    isLoading: boolean;
}

export function BlockDetail({ type, style, title, description, isLoading }: BlockDetailProps) {
    return (
        <div key={type} className="px-4 py-6 bg-neutral-900/20 border border-neutral-900 filter backdrop-blur-sm rounded-lg shadow-md">
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
                :  <TextType 
                        text={description}
                        typingSpeed={25}
                        pauseDuration={1500}
                        showCursor={true}
                        cursorCharacter="_"
                        loop={false}
                        className="whitespace-pre-line"
                    />
                }
            </div>
        </div>
    );
}