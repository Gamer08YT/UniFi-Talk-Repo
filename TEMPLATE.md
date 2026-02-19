# Common Structure (for all SIP template JSON files)

Each template file is a JSON object with the following (typical) top-level properties.

## Top-level fields

- `name` *(string)*  
  Display name of the template/provider.

- `description` *(string)*  
  Short description/purpose of the template.

- `tests` *(Array<object>)*  
  Community test results / real-world reports for this template.

- `fields` *(Array<object>)*  
  List of configurable input fields/parameters.

- `aclWhitelist` *(Array<object>)*  
  List of allowed networks/peers (whitelist).

- `settings` *(object)*  
  Technical/behavior settings (e.g., port/codec).

- `implementation` *(object)*  
  Submission/implementation status information (optionally including a version).

- `meta` *(object)*  
  Metadata such as author and source.

## `fields` structure

Each entry in `fields` is an object with:

- `name` *(string, required)*  
  Unique field key (e.g., `proxy`, `username`, `password`).

- `value` *(string | number | boolean, optional)*  
  Default or fixed value, if the field should not be user-editable.

- `description` *(string, optional)*  
  Help text describing expected input/format.

## `tests` structure

Each entry in `tests` is an object with (typical) fields like:

- `name` *(string, required)*  
  Name/label of the test setup (e.g., tariff/product name).

- `plan` *(string, optional)*  
  Plan/speed or product variant identifier.

- `tester` *(string, optional)*  
  Who performed the test.

- `working` *(boolean, required)*  
  Whether the setup worked.

- `doubleNat` *(boolean, optional)*  
  Whether the setup was behind double NAT.

## `aclWhitelist` structure

Each entry in `aclWhitelist` is an object with:

- `host` *(string, required)*  
  Base IP/network address (e.g., `217.0.0.0`).

- `cidr` *(string | number, required)*  
  CIDR prefix length (e.g., `8` for `/8`, `0` for `/0`).

## `settings` structure

`settings` is an object that may include (depending on the template), e.g.:

- `staticSignalingPort` *(boolean, optional)*  
  Whether a static signaling port is used.

- `codec` *(string, optional)*  
  Preferred codec (e.g., `PCMA`).

## `implementation` structure

`implementation` is an object that may include (depending on the template), e.g.:

- `submitted` *(boolean, optional)*  
  Whether the template was submitted.

- `implemented` *(boolean, optional)*  
  Whether the template is implemented/supported.

- `version` *(string, optional)*  
  Version information for the implementation/compatibility.

## `meta` structure

`meta` is an object that may include (depending on the template), e.g.:

- `author` *(string, optional)*  
  Author/creator.

- `source` *(string (URL), optional)*  
  Source/reference link.