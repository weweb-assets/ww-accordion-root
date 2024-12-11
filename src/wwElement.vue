<template>
    <wwLayout path="contentLayout" />
</template>

<script>
import { computed, provide, ref, watch } from 'vue';
import { useAccordion } from './composables/useAccordion';

export default {
    props: {
        content: { type: Object, required: true },
        uid: { type: String, required: true },
        /* wwEditor:start */
        wwEditorState: { type: Object, required: true },
        /* wwEditor:end */
    },
    emits: ['trigger-event'],
    setup(props, { emit }) {
        const orientation = ref(props.content.orientation);
        const type = computed(() => props.content.type);

        const { value: componentValue, setValue: setComponentValue } = wwLib.wwVariable.useComponentVariable({
            uid: props.uid,
            name: 'value',
            type: 'any',
            defaultValue: props.content.defaultValue || null,
            componentType: 'element',
        });

        const value = computed({
            get: () => componentValue.value,
            set: value => {
                setComponentValue(value);
                emit('trigger-event', { name: 'change', event: { value } });
            },
        });

        watch(
            () => props.content.type,
            newType => setComponentValue(newType === 'single' ? null : [])
        );

        const { toggleAccordion, openAccordion, closeAccordion, setAccordionValue } = useAccordion(type, value);

        provide('weweb-assets/ww-accordion-root', {
            value,
            toggleAccordion,
            openAccordion,
            closeAccordion,
            setAccordionValue,
        });

        wwLib.wwElement.useRegisterElementLocalContext('ww-accordion-root', ref({ value }), {
            toggleAccordion: {
                method: toggleAccordion,
                /* wwEditor:start */
                editor: {
                    label: 'Toggle accordion',
                    group: 'Accordion',
                    description: 'Toggle the accordion',
                    icon: 'chevron-bottom',
                    args: [
                        {
                            name: 'Value',
                            type: 'any',
                            required: true,
                        },
                    ],
                },
                /* wwEditor:end */
            },
            openAccordion: {
                method: openAccordion,
                editor: {
                    label: 'Open accordion',
                    group: 'Accordion',
                    description: 'Open the accordion',
                    icon: 'chevron-bottom',
                    args: [
                        {
                            name: 'Value',
                            type: 'any',
                            required: true,
                        },
                    ],
                },
                /* wwEditor:end */
            },
            closeAccordion: {
                method: closeAccordion,
                /* wwEditor:start */
                editor: {
                    label: 'Close accordion',
                    group: 'Accordion',
                    description: 'Close the accordion',
                    icon: 'chevron-bottom',
                    args: [
                        {
                            name: 'Value',
                            type: 'any',
                            required: true,
                        },
                    ],
                },
                /* wwEditor:end */
            },
            setAccordionValue: {
                method: setAccordionValue,
                /* wwEditor:start */
                editor: {
                    label: 'Set accordion value',
                    group: 'Accordion',
                    description: 'Set the value of the accordion',
                    icon: 'chevron-bottom',
                    args: [
                        {
                            name: 'Value',
                            type: 'any',
                            required: true,
                        },
                    ],
                },
                /* wwEditor:end */
            },
        });

        return {
            type,
            orientation,
        };
    },
};
</script>
