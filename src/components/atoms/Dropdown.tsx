import React, { useState } from 'react';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';

type StatusVariant = 'pending' | 'approved' | 'completed' | 'rejected';

interface StatusDetails {
  text: string;
  circleColor: string;
  textColor: string;
  bgColor: string;
}

interface DropdownProps {
  variant?: 'primary' | 'inverted';
  onChange?: (status: StatusDetails) => void;
  initialStatus?: StatusVariant;
}

const STATUS: Record<StatusVariant, StatusDetails> = {
  pending: {
    text: 'Pending',
    circleColor: 'bg-orange-300',
    textColor: 'text-orange-700',
    bgColor: 'bg-orange-100',
  },
  approved: {
    text: 'Approved',
    circleColor: 'bg-amber-300',
    textColor: 'text-amber-700',
    bgColor: 'bg-amber-100'
  },
  completed: {
    text: 'Completed',
    circleColor: 'bg-green-300',
    textColor: 'text-green-700',
    bgColor: 'bg-green-100'
  },
  rejected: {
    text: 'Rejected',
    circleColor: 'bg-red-300',
    textColor: 'text-red-700',
    bgColor: 'bg-red-100'
  }
};

export default function StatusDropdown({ 
  variant = "primary", 
  onChange,
  initialStatus = 'pending'
}: DropdownProps) {
  const [selectedStatus, setSelectedStatus] = useState<StatusVariant>(initialStatus);
  
  const handleStatusChange = (status: StatusVariant) => {
    setSelectedStatus(status);
    onChange?.(status);
  };

  const buttonBaseStyles = 'inline-flex items-center justify-between gap-2 rounded-md w-52 py-1.5 px-3';
  const buttonVariantStyles = {
    primary: 'border border-gray-200 text-slate-600 hover:border-gray-300 hover:bg-gray-50',
    inverted: 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
  };

  const menuBaseStyles = 'absolute right-0 mt-1 w-52 origin-top-right rounded-xl border border-gray-200 bg-white p-1 text-sm/6 shadow-lg focus:outline-none';
  const menuItemBaseStyles = 'group w-full rounded-lg py-1.5 px-3 outline-none transition-colors duration-200';
  const menuItemHoverStyles = 'hover:bg-gray-50';

  return (
    <div className="relative w-52 text-left">
      <Menu>
            <MenuButton 
              className={`${buttonBaseStyles} ${buttonVariantStyles[variant]}`}
            >
            <div className={`rounded-full w-3/4 px-2 ${STATUS[selectedStatus].bgColor}`}>
            <div className={`flex items-center gap-2 ${STATUS[selectedStatus].textColor}`}>
                <div className={`h-3 w-3 rounded-full ${STATUS[selectedStatus].circleColor}`} />
                {STATUS[selectedStatus].text}
              </div>
              </div>
              <ChevronDown
                className={"h-4 w-4 transition-transform duration-200"}
              />
            </MenuButton>

            <MenuItems className={menuBaseStyles}>
              {(Object.keys(STATUS) as StatusVariant[]).map((status) => (
                <MenuItem key={status}>
                    <button
                      className={`
                        ${menuItemBaseStyles}
                        ${menuItemHoverStyles}
                        ${status === selectedStatus ? 'bg-gray-50' : ''}
                      `}
                      onClick={() => handleStatusChange(status)}
                    >
                    <div className={`rounded-full w-3/4 px-2 ${STATUS[status].bgColor}`}>
                      <div className={`flex items-center gap-2 ${STATUS[status].textColor}`}>
                        <div className={`h-3 w-3 rounded-full ${STATUS[status].circleColor}`} />
                        <span className="flex-initial">{STATUS[status].text}</span>
                      </div>
                      </div>
                    </button>
                </MenuItem>
              ))}
            </MenuItems>
      </Menu>
    </div>
  );
}