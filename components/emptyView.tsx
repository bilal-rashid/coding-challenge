import EmptySvg from "@/components/icons/EmptySvg";

export default function EmptyView() {
    return (
        <div className="w-screen h-screen bg-white/30 flex flex-col flex-nowrap justify-center items-center">
            <div className="flex flex-col items-center">
                <EmptySvg/>
                <span className="ml-3 text-white mt-2">There are currently no users to display.</span>
            </div>
        </div>
    );
}
