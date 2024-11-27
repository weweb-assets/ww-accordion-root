<template>
    <div class="ww-accordion-root">
        <wwLayout path="contentLayout" class="ww-accordion-root-layout" />
    </div>
</template>

<script>
import { computed, provide, ref } from 'vue';

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
        const orientation = ref(() => props.content.orientation);
        const defaultValue = ref(() => props.content.defaultValue);
        const type = ref(() => props.content.type);

        const { value: componentValue, setValue: setComponentValue } = wwLib.wwVariable.useComponentVariable({
            uid: props.uid,
            name: 'value',
            type: 'text',
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

        provide('weweb-assets/ww-accordion-root', { value });

        function toggleAccordion(toggleValue) {
            if (type.value === 'single') {
                const currentValue = value.value;
                if (Array.isArray(currentValue)) {
                    value.value = currentValue[0];
                    return;
                }

                value.value = value.value === toggleValue ? null : toggleValue;
                return;
            }

            if (!Array.isArray(value.value)) {
                value.value = value.value ? [value.value] : [];
            }

            if (value.value.includes(toggleValue)) {
                value.value = value.value.filter(v => v !== toggleValue);
            } else {
                value.value.push(toggleValue);
            }
        }

        function openAccordion(openValue) {
            if (type.value === 'single') {
                value.value = openValue;
                return;
            }

            if (!Array.isArray(value.value)) {
                value.value = value.value ? [value.value] : [];
            }

            if (!value.value.includes(openValue)) {
                value.value.push(openValue);
            }
        }

        function closeAccordion(accordionValue) {
            if (type.value === 'single') {
                value.value = null;
                return;
            }

            if (!Array.isArray(value.value)) {
                value.value = value.value ? [value.value] : [];
            }

            if (value.value.includes(accordionValue)) {
                value.value = value.value.filter(v => v !== accordionValue);
            }
        }

        wwLib.wwElement.useRegisterElementLocalContext('ww-accordion-root', ref({ value }), {
            toggleAccordion: {
                method: toggleAccordion,
                editor: {
                    label: 'Toggle accordion',
                    action: 'toggleAccordion',
                },
            },
            openAccordion: {
                method: openAccordion,
                editor: {
                    label: 'Open accordion',
                    action: 'openAccordion',
                },
            },
            closeAccordion: {
                method: closeAccordion,
                editor: {
                    label: 'Close accordion',
                    action: 'closeAccordion',
                },
            },
        });

        return {
            type,
            defaultValue,
            orientation,
        };
    },
};
</script>

<style lang="scss" scoped>
.ww-accordion-root-layout {
    display: flex;
    flex-direction: column;
}
</style>
