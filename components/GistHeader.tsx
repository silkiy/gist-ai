import Image from "next/image";

export function GistHeader() {
  return (
    <div className="p-4 border-b bg-white drop-shadow-gray-300 drop-shadow-sm rounded-md">
      <div className="flex items-center space-x-2">
        <Image
          src="/icons/gist.jpg"
          width={24}
          height={24}
          alt="Gist AI Logo"
          className="w-8 h-8 rounded-2xl"
        />
        <h1 className="text-xl font-semibold text-gray-900">Gist.AI</h1>
      </div>
      <p className="text-sm text-gray-600 mt-1">
        Get a quick summary of the news you read.
      </p>
    </div>
  );
}
