import { GROUP_OPTIONS, OS_SUGGESTIONS } from '../../data/options.js';
import { SectionHeader } from '../SectionHeader.jsx';
import { SelectWithOtherField } from '../fields/SelectWithOtherField.jsx';
import { TextInput } from '../fields/TextInput.jsx';

export function ImpactedEndpointSection({ value, errors, onChange }) {
  return (
    <div className="space-y-6">
      <SectionHeader
        step="Section 02"
        title="Impacted Endpoint"
        description="These are the exact endpoint details shown directly under the intro in the page-23 sample."
      />

      <div className="grid gap-5 xl:grid-cols-2">
        <SelectWithOtherField
          id="endpoint-group-name"
          label="Group Name"
          tooltip="This becomes the third value in the first impacted-endpoint bullet, such as Default Group."
          otherLabel="Custom Group Name"
          otherTooltip="Enter a custom group name when Other is selected."
          value={value.groupName}
          otherValue={value.groupNameOther}
          options={GROUP_OPTIONS}
          error={errors['impactedEndpoint.groupName']}
          otherError={errors['impactedEndpoint.groupNameOther']}
          required
          onChange={(nextValue) => onChange('groupName', nextValue)}
          onOtherChange={(nextValue) => onChange('groupNameOther', nextValue)}
        />

        <TextInput
          id="endpoint-name"
          label="Endpoint"
          tooltip="Use the impacted endpoint shown in the sample endpoint summary line."
          value={value.endpoint}
          onChange={(event) => onChange('endpoint', event.target.value)}
          placeholder="BTC-GVQ8VB4"
          error={errors['impactedEndpoint.endpoint']}
          required
        />

        <TextInput
          id="endpoint-domain"
          label="Domain"
          tooltip="Use the Windows or directory domain shown in the report."
          value={value.domain}
          onChange={(event) => onChange('domain', event.target.value)}
          placeholder="LICORBIO"
          error={errors['impactedEndpoint.domain']}
          required
        />

        <TextInput
          id="endpoint-os"
          label="OS Version"
          tooltip="Use the OS version exactly as seen in the EDR console."
          value={value.osVersion}
          onChange={(event) => onChange('osVersion', event.target.value)}
          list="os-version-suggestions"
          placeholder="Windows 11 Pro 26100"
          error={errors['impactedEndpoint.osVersion']}
          required
        />
        <datalist id="os-version-suggestions">
          {OS_SUGGESTIONS.map((item) => (
            <option key={item} value={item} />
          ))}
        </datalist>

        <TextInput
          id="endpoint-user"
          label="Logged In User"
          tooltip="Use the exact logged-in user shown on the endpoint at detection time."
          value={value.loggedInUser}
          onChange={(event) => onChange('loggedInUser', event.target.value)}
          placeholder="dan.leib"
          error={errors['impactedEndpoint.loggedInUser']}
          required
        />

        <TextInput
          id="endpoint-ip"
          label="Console Visible IP Address"
          tooltip="Use the console-visible IP address from SentinelOne."
          value={value.consoleVisibleIp}
          onChange={(event) => onChange('consoleVisibleIp', event.target.value)}
          placeholder="97.88.223.6"
          error={errors['impactedEndpoint.consoleVisibleIp']}
          required
        />
      </div>
    </div>
  );
}
