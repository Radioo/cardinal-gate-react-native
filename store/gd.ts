import {GdProfileResponse} from "@/types/gd-profile-response";
import {create} from "zustand";

type GdStore = {
    profileData: GdProfileResponse | null;
    setProfileData: (data: GdProfileResponse | null) => void;
}

const useGdStore = create<GdStore>()((set) => ({
    profileData: null,
    setProfileData: (data) => set({ profileData: data }),
}));

export {useGdStore};
