// EquipmentFilter.tsx
import React, { useState, useEffect, ChangeEvent } from 'react';

interface Equipment {
  id: number;
  name: string;
  name_en: string;
}

interface EquipmentFilterProps {
  onSelect: (Equipment: Equipment | null) => void;
}

const EquipmentFilter: React.FC<EquipmentFilterProps> = ({ onSelect }) => {
  const [Equipments, setEquipments] = useState<Equipment[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const response = await fetch('https://wger.de/api/v2/equipment/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEquipments(data.results);
      } catch (error) {
        console.error('Error fetching Equipments:', error);
      }
    };

    fetchEquipments();
  }, []);

  const handleEquipmentSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const EquipmentId = parseInt(event.target.value, 10);
    const selectedEquipment = Equipments.find((Equipment) => Equipment.id === EquipmentId) || null;
    setSelectedEquipment(selectedEquipment);
    onSelect(selectedEquipment);
  };

  return (
    <div>
      <label htmlFor="EquipmentSelect">Select Equipment:</label>
      <select id="EquipmentSelect" value={selectedEquipment ? selectedEquipment.id : ''} onChange={handleEquipmentSelect}>
        <option value="">All Equipments</option>
        {Equipments.map((Equipment) => (
          <option key={Equipment.id} value={Equipment.id}>
            {Equipment.name_en || Equipment.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default EquipmentFilter;
