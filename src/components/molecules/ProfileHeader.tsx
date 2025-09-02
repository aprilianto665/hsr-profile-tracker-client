interface ProfileHeaderProps {
  uid: string;
}

export function ProfileHeader({ uid }: ProfileHeaderProps) {
  return (
    <>
      <h1 className="text-2xl md:text-5xl font-black text-black tracking-tight leading-none mb-2 md:mb-3 md:whitespace-nowrap">
        PROFILE DETAILS
      </h1>
      <div className="flex items-center justify-center gap-2 md:gap-3">
        <div className="w-6 md:w-12 h-0.5 bg-black"></div>
        <p className="text-sm md:text-lg font-bold text-black px-1 md:px-2">
          UID: {uid}
        </p>
        <div className="w-6 md:w-12 h-0.5 bg-black"></div>
      </div>
      <div className="absolute -bottom-3 md:-bottom-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 md:px-4 py-1 transform -skew-x-12 z-30">
        <h2 className="text-xs md:text-sm font-bold tracking-widest uppercase transform skew-x-12 whitespace-nowrap">
          Trailblazer Data
        </h2>
      </div>
    </>
  );
}