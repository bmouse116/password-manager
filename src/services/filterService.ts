import { SortTypes, type PasswordEntry } from "../types";

export interface FilterCriteria {
    searchQuery: string;
    tagGroup: string;
    sort: SortTypes
}

export function filterEntries(entries: PasswordEntry[], criteria: FilterCriteria): PasswordEntry[] {
    const {searchQuery, tagGroup, sort} = criteria

    let result = entries.filter(entry => {
        const matchesQuery = searchQuery.trim()
            ? entry.name.toLowerCase().includes(searchQuery.toLowerCase())
            : true;

        const matchesTags = tagGroup.trim()
            ? entry.tags?.some(tag => tag.text === tagGroup)
            : true;

        return matchesQuery && matchesTags
    })

    if(sort === SortTypes.FAVORITE) {
        result = result.filter(res => res.isFavorite === true)
    }
    if(sort === SortTypes.NEW) {
        result = result.slice().sort((a, b) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        })
    }
    
    return result
}