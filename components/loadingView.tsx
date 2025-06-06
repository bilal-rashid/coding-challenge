import LoadingViewSvg from "@/components/icons/LoadingViewSvg";

export default function LoadingView() {
    return (
        <div className="w-screen h-screen bg-white/30 flex flex-col flex-nowrap justify-center items-center">
            <div className="flex flex-col">
                <LoadingViewSvg/>
                <span className="ml-3 text-white">Loading users...</span>
            </div>
        </div>
    );
}
