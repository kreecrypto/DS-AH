# Decision — Component Resolution

Given a UI need:

1. Identify semantic need, not layer name.
2. Search exact target-product dependency/component identity.
3. Search canonical Core DS.
4. Compare component keys, ownership and API.
5. Choose one:

### REUSE
Existing asset satisfies semantics and behavior.

### EXTEND
Same semantic family; a new documented variant/property is appropriate.

### WRAP
Core asset is correct but product/domain composition needs a stable wrapper.

### CREATE_DOMAIN
No suitable domain pattern exists and the concept is business-specific/reusable.

### CREATE_CORE
Allowed only with evidence that no Core equivalent exists and the concept is cross-domain.

### SCREEN_ONLY
One-off composition; do not promote.

### REVIEW_REQUIRED
Meaning/ownership is ambiguous.

## Same-name rule

**Same display name is not proof of same component identity.**

Compare published component key and live ownership before substitution.
