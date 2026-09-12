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

export interface Application {
  id: number;
  position_id: number;
  applicant_id: number;
  data: string;
  status: string;
}

export function filterNurseries(
  nurseries: Nursery[],
  positions: Position[],
  applications: Application[],
  searchTerm: string,
  vacancyFilter: 'all' | 'has' | 'none',
  appFilter: 'all' | 'has' | 'none'
): Nursery[] {
  return nurseries.filter(nursery => {
    const nurseryPositions = positions.filter(p => p.nursery_id === nursery.id);
    const hasPositions = nurseryPositions.length > 0;
    
    const nurseryPositionIds = nurseryPositions.map(p => p.id);
    const hasApplications = applications.some(app => nurseryPositionIds.includes(app.position_id));
    
    const matchesSearch = 
      nursery.data.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nurseryPositions.some(p => p.data.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesVacancy = 
      vacancyFilter === 'all' || 
      (vacancyFilter === 'has' && hasPositions) || 
      (vacancyFilter === 'none' && !hasPositions);

    const matchesApps = 
      appFilter === 'all' || 
      (appFilter === 'has' && hasApplications) || 
      (appFilter === 'none' && !hasApplications);

    return matchesSearch && matchesVacancy && matchesApps;
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
