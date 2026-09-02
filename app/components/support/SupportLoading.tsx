export function SupportLoading() {

    return (
        <div
            className="
                flex
                min-h-[calc(100dvh-80px)]
                items-center
                justify-center
                bg-gray-50
                px-6
            "
        >

            <div
                className="
                    text-center
                "
            >

                <div
                    className="
                        mx-auto
                        h-10
                        w-10
                        animate-spin
                        rounded-full
                        border-4
                        border-gray-200
                        border-t-black
                    "
                />

                <h2
                    className="
                        mt-5
                        text-sm
                        font-semibold
                        text-gray-900
                    "
                >
                    Loading support
                </h2>

                <p
                    className="
                        mt-1
                        text-xs
                        text-gray-500
                    "
                >
                    Connecting you with support...
                </p>

            </div>

        </div>
    );
}