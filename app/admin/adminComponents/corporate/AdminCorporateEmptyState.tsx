import {
    Megaphone,
    Plus,
    SearchX,
} from "lucide-react";

interface Props {
    hasSearch: boolean;
    onCreate: () => void;
}

export function AdminCorporateEmptyState({
    hasSearch,
    onCreate,
}: Props) {

    if (hasSearch) {

        return (
            <div
                className="
                    rounded-2xl
                    border
                    border-dashed
                    border-gray-300
                    bg-white
                    px-6
                    py-14
                    text-center
                "
            >

                <SearchX
                    size={32}
                    className="mx-auto text-gray-400"
                />

                <h3
                    className="
                        mt-4
                        font-semibold
                        text-gray-900
                    "
                >
                    No announcements found
                </h3>

                <p
                    className="
                        mt-1
                        text-sm
                        text-gray-500
                    "
                >
                    Try another search term.
                </p>

            </div>
        );
    }

    return (
        <div
            className="
                rounded-2xl
                border
                border-dashed
                border-gray-300
                bg-white
                px-6
                py-14
                text-center
            "
        >

            <div
                className="
                    mx-auto
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-gray-100
                    text-gray-500
                "
            >
                <Megaphone size={25} />
            </div>

            <h3
                className="
                    mt-5
                    font-semibold
                    text-gray-900
                "
            >
                No announcements yet
            </h3>

            <p
                className="
                    mx-auto
                    mt-2
                    max-w-sm
                    text-sm
                    leading-6
                    text-gray-500
                "
            >
                Create your first corporate announcement
                to communicate important information to
                your users.
            </p>

            <button
                type="button"
                onClick={onCreate}
                className="
                    mt-5
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-black
                    px-4
                    py-2.5
                    text-sm
                    font-semibold
                    text-white
                    hover:bg-gray-800
                "
            >
                <Plus size={17} />
                Create Announcement
            </button>

        </div>
    );
}