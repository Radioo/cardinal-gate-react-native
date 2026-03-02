import useApiQuery from "@/hooks/queries/useApiQuery";
import {GdSkillDataResponse} from "@/types/gd-skill-data-response";

export default function useGdSkill(version: number | undefined) {
    return useApiQuery<GdSkillDataResponse>(
        ['gdSkill', version],
        `/api2/gd/skill/${version}`,
        {enabled: version !== undefined},
    );
}
