import ErrorSvg from "@/components/icons/ErrorSvg";
interface Props {
    errorMessage: string;
}
export default function ErrorView({ errorMessage }: Props) {
    return (
        <div className="w-screen h-screen bg-white/30 flex flex-col flex-nowrap justify-center items-center">
            <div className="flex flex-col">
                <ErrorSvg/>
                <span className="ml-3 text-white">{errorMessage}</span>
            </div>
        </div>
    );
}
