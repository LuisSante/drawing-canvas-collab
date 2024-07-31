import Image from "next/image";
import Link from "next/link";
import { Overlay } from "./overlay";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@clerk/nextjs";
import { Footer } from "./footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Actions } from "@/components/actions";
import { MoreHorizontal } from "lucide-react";

interface BoardCardProps {
    id: string;
    title: string;
    authorName: string;
    authorId: string;
    createdAt: number;
    imageUrl: string;
    orgId: string;
    isFavorite: boolean;
}

export const BoardCard = ({
    id,
    title,
    authorName,
    authorId,
    createdAt,
    imageUrl,
    orgId,
    isFavorite,
}: BoardCardProps) => {

    const { userId } = useAuth();
    const authorLabel = userId === authorId ? "You" : authorName;
    const createdAtLabel = formatDistanceToNow(createdAt, {
        addSuffix: true,
    })

    return (
        <Link
            href={` /board/${id}`}
        >
            <div className="flex flex-col justify-between border rounded-lg overflow-hidden aspect-[100/127] group">
                <div className="relative flex-1 bg-amber-50">
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-fit"
                    />
                    <Overlay />
                    <Actions
                        id={id}
                        title={title}
                        side="right"
                    >
                        <button
                            className="top-1 right-1 absolute opacity-0 group-hover:opacity-100 px-3 py-2 transition-opacity outline-none"
                        >
                            <MoreHorizontal
                                className="hover:opacity-100 text-white transition-opacity opactity-75"
                            />
                        </button>
                    </Actions>
                </div>
                <Footer
                    isFavorite={isFavorite}
                    title={title}
                    authorLabel={authorLabel}
                    onClick={() => { }}
                    disabled={false}
                    createdAtLabel={createdAtLabel}
                />
            </div>
        </Link>
    );
};

BoardCard.Skeleton = function BoardCardSkeleton() {
    return (
        <div className="rounded-lg overflow-hidden aspect-[100/127]">
            <Skeleton className="w-full h-full" />
        </div>
    );
};