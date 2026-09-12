export interface Nursery {
  id: number;
  data: string;
}

export interface Position {
  id: number;
  nursery_id: number;
  data: string;
  status: string;
}

export function filterNurseries(
  nurseries: Nursery[],
  positions: Position[],
  searchTerm: string,
  vacancyFilter: 'all' | 'has' | 'none'
): Nursery[] {
  return nurseries.filter(nursery => {
    const nurseryPositions = positions.filter(p => p.nursery_id === nursery.id);
    const hasPositions = nurseryPositions.length > 0;
    
    const matchesSearch = 
      nursery.data.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nurseryPositions.some(p => p.data.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesVacancy = 
      vacancyFilter === 'all' || 
      (vacancyFilter === 'has' && hasPositions) || 
      (vacancyFilter === 'none' && !hasPositions);

    return matchesSearch && matchesVacancy;
  });
}

export function filterPositions(
  positions: Position[],
  nurseries: Nursery[],
  searchTerm: string
): Position[] {
  return positions.filter(pos => {
    const nursery = nurseries.find(n => n.id === pos.nursery_id);
    const nurseryName = nursery ? nursery.data : '';
    
    return (
      pos.data.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nurseryName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
}
