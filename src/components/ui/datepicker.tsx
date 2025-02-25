"use client"

import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import styles
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { CalendarIcon } from "@radix-ui/react-icons";

interface CustomDatePickerProps {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  selectedDate,
  setSelectedDate,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger className="flex items-center border rounded p-2">
        <CalendarIcon className="mr-2" />
        {selectedDate ? selectedDate.toLocaleDateString() : "Select a date"}
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="z-50">
        <div className="p-2">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
              setOpen(false); // Close the dropdown when a date is selected
            }}
            className="border rounded p-2"
            dateFormat="yyyy/MM/dd"
            inline // Display inline or customize according to your needs
          />
        </div>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default CustomDatePicker;
