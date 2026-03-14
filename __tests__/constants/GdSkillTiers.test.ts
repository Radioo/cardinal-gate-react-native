import {SKILL_GRADIENT_TIERS} from '@/constants/gd-skill-tiers';

describe('SKILL_GRADIENT_TIERS', () => {
    it('has 16 entries', () => {
        expect(SKILL_GRADIENT_TIERS).toHaveLength(16);
    });

    it('has first threshold of 850000', () => {
        expect(SKILL_GRADIENT_TIERS[0].threshold).toBe(850000);
    });

    it('has last threshold of 100000', () => {
        expect(SKILL_GRADIENT_TIERS[SKILL_GRADIENT_TIERS.length - 1].threshold).toBe(100000);
    });

    it('each entry has at least 2 colors', () => {
        for (const tier of SKILL_GRADIENT_TIERS) {
            expect(tier.colors.length).toBeGreaterThanOrEqual(2);
        }
    });
});
