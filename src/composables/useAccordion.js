export function useAccordion(type, value) {
    function toggleAccordion(toggleValue) {
        if (type.value === 'multiple') {
            const currentValues = new Set(Array.isArray(value.value) ? value.value : []);
            currentValues.has(toggleValue) ? currentValues.delete(toggleValue) : currentValues.add(toggleValue);
            value.value = Array.from(currentValues);
        } else {
            value.value = value.value === toggleValue ? null : toggleValue;
        }
    }

    function openAccordion(openValue) {
        if (type.value === 'multiple') {
            const currentValues = new Set(value.value);
            currentValues.add(openValue);
            value.value = Array.from(currentValues);
        } else {
            value.value = openValue;
        }
    }

    function closeAccordion(closeValue) {
        if (type.value === 'multiple') {
            value.value = value.value.filter(val => val !== closeValue);
        } else {
            value.value = value.value === closeValue ? null : value.value;
        }
    }

    function setAccordionValue(setAccordionValue) {
        value.value = setAccordionValue;
    }

    return {
        toggleAccordion,
        openAccordion,
        closeAccordion,
        setAccordionValue,
    };
}
